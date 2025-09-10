import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Users,
  MapPin
} from 'lucide-react';

const mockData = {
  stats: {
    totalComplaints: 1247,
    resolved: 945,
    pending: 302,
    avgResolutionTime: 3.2
  },
  recentComplaints: [
    { id: 'CVC001245', type: 'road', location: 'MG Road, Pune', status: 'pending', time: '2 hours ago' },
    { id: 'CVC001244', type: 'water', location: 'Sector 15, Noida', status: 'resolved', time: '5 hours ago' },
    { id: 'CVC001243', type: 'electricity', location: 'Koramangala, Bangalore', status: 'in-progress', time: '1 day ago' },
  ],
  categories: [
    { name: 'Roads', count: 456, percentage: 36.6, color: 'bg-orange-500' },
    { name: 'Water', count: 321, percentage: 25.8, color: 'bg-blue-500' },
    { name: 'Electricity', count: 289, percentage: 23.2, color: 'bg-yellow-500' },
    { name: 'Garbage', count: 181, percentage: 14.5, color: 'bg-green-500' }
  ]
};

export const Dashboard: React.FC = () => {
  const resolutionRate = Math.round((mockData.stats.resolved / mockData.stats.totalComplaints) * 100);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-civic bg-clip-text text-transparent mb-2">
          Government Dashboard
        </h2>
        <p className="text-muted-foreground">
          सरकारी डैशबोर्ड / Real-time civic complaint monitoring
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-primary text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Complaints</p>
                <p className="text-2xl font-bold">{mockData.stats.totalComplaints}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-success text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Resolved</p>
                <p className="text-2xl font-bold">{mockData.stats.resolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Pending</p>
                <p className="text-2xl font-bold">{mockData.stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-civic text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Avg Resolution</p>
                <p className="text-2xl font-bold">{mockData.stats.avgResolutionTime}d</p>
              </div>
              <TrendingUp className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resolution Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Resolution Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">{resolutionRate}%</div>
              <p className="text-sm text-muted-foreground">Complaints resolved successfully</p>
            </div>
            <Progress value={resolutionRate} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{mockData.stats.resolved} Resolved</span>
              <span>{mockData.stats.pending} Pending</span>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Complaint Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{category.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{category.count}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.percentage}%
                    </Badge>
                  </div>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Complaints */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Recent Complaints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.recentComplaints.map((complaint, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-mono font-medium text-primary">
                    {complaint.id}
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {complaint.type}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {complaint.location}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge 
                    variant={complaint.status === 'resolved' ? 'default' : 'secondary'}
                    className={
                      complaint.status === 'resolved' 
                        ? 'bg-success text-white' 
                        : complaint.status === 'in-progress'
                        ? 'bg-secondary text-white'
                        : 'bg-orange-500 text-white'
                    }
                  >
                    {complaint.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {complaint.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};