import { useContext, useEffect, useState } from 'react';
import { getGuildBanLogs } from '../utils/api';
import { GuildContext } from '../utils/contexts/GuildContext';
import { GuildBanLogsType } from '../utils/types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export const GuildAnalyticsPage = () => {
  const { guild } = useContext(GuildContext);
  const guildId = (guild && guild.id) || '';

  const [guildBanLogs, setGuildBanLogs] = useState<GuildBanLogsType[]>([]);

  const getLabels = () => {
    const currentDate = new Date();
    const last = currentDate.getDate();
    const start = last - 6;
    const labels = [];
    for (let i = start; i <= last; i++) {
      currentDate.setDate(i);
      labels.push(`${currentDate.getMonth() + 1}/${currentDate.getDate()}`);
    }
    return labels;
  };

  const prepareData = (data: GuildBanLogsType[]) => {
    const currentDate = new Date();
    const last = currentDate.getDate();
    const start = last - 6;
    const dataRecords = [];
    for (let i = start; i <= last; i++) {
      const records = data.filter(
        (banLog) => new Date(banLog.issuedOn).getDate() === i
      );
      dataRecords.push(records.length);
    }
    return dataRecords;
  };

  useEffect(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 6);
    const fromDate = currentDate.toLocaleDateString();
    console.log(fromDate);
    getGuildBanLogs(guildId, fromDate)
      .then(({ data }) => {
        setGuildBanLogs(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div style={{ width: '1000px' }}>
      <Line
        data={{
          labels: getLabels(),
          datasets: [
            {
              label: 'Ban Analytics',
              data: prepareData(guildBanLogs),
              borderColor: 'white',
              pointBorderColor: 'orange',
            },
          ],
        }}
      />
    </div>
  );
};
