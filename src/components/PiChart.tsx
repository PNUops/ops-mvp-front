import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

interface PieItem {
  name: string;
  value: number;
}

interface PieData {
  pieData: PieItem[];
  totalVotes: number;
  participationRate: number;
  pieColors: string[];
}

const VoteRate: React.FC<PieData> = ({ pieData, totalVotes, participationRate, pieColors }) => {
  return (
    <section className="">
      <h2 className="mb-4 text-2xl font-bold">투표 참여율</h2>
      <div
        className="mx-auto w-[100%] rounded bg-white p-6 text-center shadow-md"
        style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.12)' }}
      >
        <div className="flex justify-center">
          <PieChart width={150} height={150}>
            {/* 1. 회색 배경 원 전체 */}
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
              <Cell fill={pieColors[1]} stroke="none" /> {/* 회색 */}
            </Pie>

            {/* 2. 초록 참여율 조각만 위에 덧칠 */}
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
              <Cell fill={pieColors[0]} /> {/* 초록 */}
            </Pie>

            {/* <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              dataKey="value"
              startAngle={-270}
              endAngle={90}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie> */}
          </PieChart>
        </div>
        <p className="-mt-20 text-xl font-bold text-green-600">{participationRate}%</p>
        <p className="mt-20 text-lg font-bold">
          총 투표수 <span className="text-black">{totalVotes}개</span>
        </p>
      </div>
    </section>
  );
};
export default VoteRate;
