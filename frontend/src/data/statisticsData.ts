export interface StatisticsData {
  vacantGarages: number;
  totalDebt: number;
  activeMembers: number;
  membersWithDebts: number;
  chartData: ChartPoint[];
}

export interface ChartPoint {
  label: string;
  correctAnswers: number;
  completionSpeed: number;
}

export const statisticsData: Record<string, StatisticsData> = {
  D: {
    vacantGarages: 35,
    totalDebt: 5432,
    activeMembers: 73,
    membersWithDebts: 11,
    chartData: [
      { label: "00:00", correctAnswers: 82, completionSpeed: 15 },
      { label: "04:00", correctAnswers: 78, completionSpeed: 12 },
      { label: "08:00", correctAnswers: 85, completionSpeed: 18 },
      { label: "12:00", correctAnswers: 92, completionSpeed: 22 },
      { label: "16:00", correctAnswers: 88, completionSpeed: 20 },
      { label: "20:00", correctAnswers: 84, completionSpeed: 16 },
      { label: "24:00", correctAnswers: 80, completionSpeed: 14 },
    ],
  },
  W: {
    vacantGarages: 42,
    totalDebt: 6120,
    activeMembers: 68,
    membersWithDebts: 15,
    chartData: [
      { label: "Mon", correctAnswers: 75, completionSpeed: 12 },
      { label: "Tue", correctAnswers: 78, completionSpeed: 14 },
      { label: "Wed", correctAnswers: 82, completionSpeed: 16 },
      { label: "Thu", correctAnswers: 85, completionSpeed: 18 },
      { label: "Fri", correctAnswers: 88, completionSpeed: 20 },
      { label: "Sat", correctAnswers: 90, completionSpeed: 22 },
      { label: "Sun", correctAnswers: 86, completionSpeed: 19 },
    ],
  },
  M: {
    vacantGarages: 28,
    totalDebt: 4890,
    activeMembers: 76,
    membersWithDebts: 8,
    chartData: [
      { label: "Week 1", correctAnswers: 70, completionSpeed: 10 },
      { label: "Week 2", correctAnswers: 75, completionSpeed: 12 },
      { label: "Week 3", correctAnswers: 80, completionSpeed: 15 },
      { label: "Week 4", correctAnswers: 85, completionSpeed: 18 },
    ],
  },
  Y: {
    vacantGarages: 35,
    totalDebt: 5432,
    activeMembers: 73,
    membersWithDebts: 11,
    chartData: [
      { label: "Jan", correctAnswers: 65, completionSpeed: 8 },
      { label: "Feb", correctAnswers: 68, completionSpeed: 9 },
      { label: "Mar", correctAnswers: 72, completionSpeed: 11 },
      { label: "Apr", correctAnswers: 75, completionSpeed: 12 },
      { label: "May", correctAnswers: 78, completionSpeed: 14 },
      { label: "Jun", correctAnswers: 82, completionSpeed: 16 },
      { label: "Jul", correctAnswers: 85, completionSpeed: 18 },
      { label: "Aug", correctAnswers: 88, completionSpeed: 20 },
      { label: "Sep", correctAnswers: 90, completionSpeed: 22 },
      { label: "Oct", correctAnswers: 87, completionSpeed: 19 },
      { label: "Nov", correctAnswers: 84, completionSpeed: 17 },
      { label: "Dec", correctAnswers: 82, completionSpeed: 15 },
    ],
  },
  ALL: {
    vacantGarages: 31,
    totalDebt: 4950,
    activeMembers: 78,
    membersWithDebts: 9,
    chartData: [
      { label: "2020", correctAnswers: 60, completionSpeed: 6 },
      { label: "2021", correctAnswers: 68, completionSpeed: 8 },
      { label: "2022", correctAnswers: 75, completionSpeed: 12 },
      { label: "2023", correctAnswers: 82, completionSpeed: 16 },
      { label: "2024", correctAnswers: 88, completionSpeed: 20 },
      { label: "2025", correctAnswers: 90, completionSpeed: 22 },
    ],
  },
};
