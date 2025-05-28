import { PieChart, Pie, Cell } from 'recharts';

interface Props {
  totalVotes: number;
  participationRate: number;
}

const VoteRate = ({ totalVotes, participationRate }: Props) => {
  const pieColors = ['#22c55e', '#e5e7eb'];
  return (
    <section className="">
      <h2 className="mb-4 text-2xl font-bold">투표 참여율</h2>
      <div
        className="mx-auto w-[100%] rounded bg-white p-6 text-center shadow-md"
        style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.12)' }}
      >
        <div className="flex justify-center">
          <PieChart width={150} height={150}>
            <Pie
              data={[{ name: '배경', value: 100 }]}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              startAngle={0}
              endAngle={360}
              dataKey="value"
              cornerRadius={0}
            >
              <Cell fill={pieColors[1]} stroke="none" />
            </Pie>
            <Pie
              data={[{ name: '참여', value: participationRate }]}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              startAngle={90}
              endAngle={90 - (360 * participationRate) / 100}
              dataKey="value"
              cornerRadius={10}
            >
              <Cell fill={pieColors[0]} />
            </Pie>
          </PieChart>
        </div>
        <p className="-mt-20 text-xl font-bold text-green-600">{participationRate}%</p>
        <p className="mt-20 text-gray-400">총 투표수 </p>
        <p className="text-lg font-bold">
          <span className="text-black">{totalVotes}개</span>
        </p>
      </div>
    </section>
  );
};
export default VoteRate;
