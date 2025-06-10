export const mockUsers = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  surveysCompleted: Math.floor(Math.random() * 20),
  joinDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
  status: Math.random() > 0.3 ? 'Active' : 'Inactive'
}));

export const mockSurveys = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Survey ${i + 1}`,
  responses: Math.floor(Math.random() * 1000),
  completionRate: Math.floor(Math.random() * 100),
  createdDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
  status: Math.random() > 0.5 ? 'Active' : 'Closed'
}));

export const chartData = [
  { month: 'Jan', responses: 450 },
  { month: 'Feb', responses: 520 },
  { month: 'Mar', responses: 480 },
  { month: 'Apr', responses: 610 },
  { month: 'May', responses: 580 },
  { month: 'Jun', responses: 690 }
];