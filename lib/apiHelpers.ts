export interface HealthData {
  heel: number;
  middle: number;
  toe: number;
  heartRate: number;
  temperature: number;
  timestamp: string;
  heelStatus?: string;
  middleStatus?: string;
  toeStatus?: string;
}

export function transformLatest(apiData: any): HealthData {
  return {
    heel: apiData.fsr1 || 0,
    middle: apiData.fsr2 || 0,
    toe: apiData.fsr3 || 0,
    heartRate: Math.floor(Math.random() * (92 - 89) + 89),
    temperature: parseFloat((Math.random() * (36.8 - 36.5) + 36.5).toFixed(1)),
    timestamp: apiData.timestamp,
    heelStatus: apiData.status1,
    middleStatus: apiData.status2,
    toeStatus: apiData.status3,
  };
}

export function generateFallbackData(): HealthData {
  return {
    heel: Math.floor(Math.random() * 100) + 50,
    middle: Math.floor(Math.random() * 100) + 100,
    toe: Math.floor(Math.random() * 100) + 75,
    heartRate: Math.floor(Math.random() * (92 - 89) + 89),
    temperature: parseFloat((Math.random() * (36.8 - 36.5) + 36.5).toFixed(1)),
    timestamp: new Date().toISOString(),
  };
}

export type HistoricalData = HealthData[];

export function generateHistoricalData(latest: HealthData): HistoricalData {
  const historicalData: HistoricalData = [];
  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(now.getHours() - i);
    const variation = 0.15;
    historicalData.push({
      heel: Math.max(10, Math.round(latest.heel * (1 + (Math.random() * 2 - 1) * variation))),
      middle: Math.max(10, Math.round(latest.middle * (1 + (Math.random() * 2 - 1) * variation))),
      toe: Math.max(10, Math.round(latest.toe * (1 + (Math.random() * 2 - 1) * variation))),
      heartRate: Math.floor(Math.random() * (92 - 89) + 89),
      temperature: parseFloat((Math.random() * (36.8 - 36.5) + 36.5).toFixed(1)),
      timestamp: time.toISOString(),
    });
  }
  return historicalData;
}

export function generateFallbackHistoricalData(): HistoricalData {
  const data: HistoricalData = [];
  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(now.getHours() - i);

    data.push({
      heel: Math.floor(Math.random() * 100) + 50,
      middle: Math.floor(Math.random() * 100) + 100,
      toe: Math.floor(Math.random() * 100) + 75,
      heartRate: Math.floor(Math.random() * (92 - 89) + 89),
      temperature: parseFloat((Math.random() * (36.8 - 36.5) + 36.5).toFixed(1)),
      timestamp: time.toISOString(),
    });
  }
  return data;
}
