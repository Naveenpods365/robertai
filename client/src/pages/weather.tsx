import { useQuery } from "@tanstack/react-query";
import { Card } from "../components/ui/card";
import { PageSkeleton, ErrorState } from "../components/loading-skeleton";
import { Sun, Cloud, CloudRain, Wind, Droplets, Thermometer } from "lucide-react";
import type { Weather } from "@shared/schema";

export default function WeatherPage() {
  const { data: weather, isLoading, error } = useQuery<Weather>({
    queryKey: ["/api/weather"],
  });

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error) {
    return <ErrorState message="Failed to load weather data. Please try again." />;
  }

  const forecast = [
    { day: "Monday", temp: 26, condition: "Sunny", rain: 0 },
    { day: "Tuesday", temp: 24, condition: "Partly Cloudy", rain: 10 },
    { day: "Wednesday", temp: 22, condition: "Cloudy", rain: 40 },
    { day: "Thursday", temp: 20, condition: "Rainy", rain: 80 },
    { day: "Friday", temp: 23, condition: "Partly Cloudy", rain: 20 },
    { day: "Saturday", temp: 25, condition: "Sunny", rain: 5 },
    { day: "Sunday", temp: 27, condition: "Sunny", rain: 0 },
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="w-12 h-12 text-accent" />;
      case "cloudy":
      case "partly cloudy":
        return <Cloud className="w-12 h-12 text-primary" />;
      case "rainy":
        return <CloudRain className="w-12 h-12 text-chart-3" />;
      default:
        return <Cloud className="w-12 h-12 text-primary" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Weather</h1>
        <p className="text-muted-foreground">Current conditions and forecast for {weather?.location || "Saskatchewan"}</p>
      </div>

      <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="text-center mb-6">
          <p className="text-lg text-muted-foreground mb-2">Current Conditions</p>
          <div className="flex items-center justify-center mb-4">
            {getWeatherIcon(weather?.condition || "Sunny")}
          </div>
          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="text-6xl font-bold font-mono text-foreground">{weather?.temperature || 28}</span>
            <span className="text-3xl font-semibold text-muted-foreground">°C</span>
          </div>
          <p className="text-xl text-foreground">{weather?.condition || "Sunny"}</p>
          <p className="text-sm text-muted-foreground mt-2">{weather?.location || "Saskatchewan"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-card-border">
            <Droplets className="w-8 h-8 text-chart-3" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="text-2xl font-bold font-mono text-foreground">{weather?.humidity || 65}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-card-border">
            <Wind className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
              <p className="text-2xl font-bold font-mono text-foreground">12 km/h</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-card-border">
            <CloudRain className="w-8 h-8 text-chart-3" />
            <div>
              <p className="text-sm text-muted-foreground">Rain Forecast</p>
              <p className="text-2xl font-bold font-mono text-foreground">{weather?.rainForecast || 3} days</p>
            </div>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">7-Day Forecast</h2>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {forecast.map((day, index) => (
            <Card key={index} className="p-4 text-center hover-elevate" data-testid={`card-forecast-${day.day.toLowerCase()}`}>
              <p className="text-sm font-semibold text-foreground mb-2">{day.day}</p>
              <div className="flex justify-center mb-2">
                {getWeatherIcon(day.condition)}
              </div>
              <p className="text-2xl font-bold font-mono text-foreground mb-1">{day.temp}°</p>
              <p className="text-xs text-muted-foreground mb-2">{day.condition}</p>
              {day.rain > 0 && (
                <div className="flex items-center justify-center gap-1 text-xs text-chart-3">
                  <Droplets className="w-3 h-3" />
                  <span>{day.rain}%</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-6 bg-muted/30">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Agricultural Advisory</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Thermometer className="w-3 h-3 text-primary" />
            </div>
            <div>
              <p className="text-sm text-foreground">Optimal temperatures for wheat harvesting this week</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-chart-3/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CloudRain className="w-3 h-3 text-chart-3" />
            </div>
            <div>
              <p className="text-sm text-foreground">Rain expected Thursday - plan field work accordingly</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sun className="w-3 h-3 text-accent" />
            </div>
            <div>
              <p className="text-sm text-foreground">Extended sunny period ideal for crop drying</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
