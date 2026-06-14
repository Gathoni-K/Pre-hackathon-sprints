interface CardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export default function Card({ title, value, change, isPositive }: CardProps) {
  return (
    <div>
      <div>{title}</div>
      <div>{value}</div>
      <div>{change} vs last month</div>
    </div>
  );
}