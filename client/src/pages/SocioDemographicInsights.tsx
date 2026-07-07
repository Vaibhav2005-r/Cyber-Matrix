import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Users, Briefcase, GraduationCap } from 'lucide-react';

const ageData = [
  { age: 'Under 18', male: 120, female: 30 },
  { age: '18-25', male: 850, female: 140 },
  { age: '26-35', male: 1200, female: 210 },
  { age: '36-45', male: 750, female: 180 },
  { age: '46-60', male: 320, female: 90 },
  { age: '60+', male: 110, female: 40 },
];

const educationData = [
  { name: 'Illiterate', value: 450 },
  { name: 'Primary', value: 850 },
  { name: 'Secondary', value: 1200 },
  { name: 'Graduate', value: 420 },
  { name: 'Post-Graduate', value: 90 },
];

const employmentData = [
  { name: 'Unemployed', value: 1800 },
  { name: 'Daily Wage', value: 1250 },
  { name: 'Salaried', value: 650 },
  { name: 'Business', value: 420 },
  { name: 'Student', value: 210 },
];

const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

export const SocioDemographicInsights: React.FC = () => {
  return (
    <div className="p-6 pb-16">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Socio-Demographic Insights</h1>
        <p className="text-muted-foreground">Analyze age, gender, education, and employment correlations with crime rates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Highest Risk Age Group</CardTitle>
            <Users className="text-primary" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">26-35 Years</div>
            <p className="text-xs text-muted-foreground mt-1">42% of total arrests</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Gender Distribution</CardTitle>
            <Users className="text-blue-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82% Male</div>
            <p className="text-xs text-muted-foreground mt-1">18% Female offenders</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Education Mode</CardTitle>
            <GraduationCap className="text-yellow-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Secondary</div>
            <p className="text-xs text-muted-foreground mt-1">Highest frequency in dataset</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Primary Occupation</CardTitle>
            <Briefcase className="text-green-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Unemployed</div>
            <p className="text-xs text-muted-foreground mt-1">Strong correlation with property crimes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Age & Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="age" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
                <Legend />
                <Bar dataKey="male" name="Male" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="female" name="Female" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-md">Education Level</CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={educationData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
                    {educationData.map((_entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-md">Employment Status</CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={employmentData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
                    {employmentData.map((_entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
