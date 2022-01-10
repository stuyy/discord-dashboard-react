import { useContext, useEffect, useState } from 'react';
import { getGuildBanLogs, getGuildModLogs } from '../utils/api';
import { GuildContext } from '../utils/contexts/GuildContext';
import { GuildModLogType } from '../utils/types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { Flex, Title } from '../utils/styles';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export const GuildAnalyticsPage = () => {
  const { guild } = useContext(GuildContext);
  const guildId = (guild && guild.id) || '';

  const [modLogs, setModLogs] = useState<GuildModLogType[]>([]);

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

  const prepareData = (data: GuildModLogType[]) => {
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
    getGuildModLogs(guildId, fromDate)
      .then(({ data }) => {
        setModLogs(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ width: '800px', margin: '0 auto' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
        }}
      >
        <div>
          <Title>Ban Analytics</Title>
          <Line
            data={{
              labels: getLabels(),
              datasets: [
                {
                  label: 'Ban Analytics',
                  data: prepareData(
                    modLogs.filter((log) => log.type === 'ban')
                  ),
                  borderColor: 'white',
                  pointBorderColor: 'orange',
                },
              ],
            }}
          />
        </div>
        <div>
          <Title>Kick Analytics</Title>
          <Line
            data={{
              labels: getLabels(),
              datasets: [
                {
                  label: 'Kick Analytics',
                  data: prepareData(
                    modLogs.filter((log) => log.type === 'kick')
                  ),
                  borderColor: 'white',
                  pointBorderColor: 'orange',
                },
              ],
            }}
          />
        </div>
        <div>
          <Title>Timeout Analytics</Title>
          <Line
            data={{
              labels: getLabels(),
              datasets: [
                {
                  label: 'Timeout Analytics',
                  data: prepareData(
                    modLogs.filter((log) => log.type === 'timeout')
                  ),
                  borderColor: 'white',
                  pointBorderColor: 'orange',
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};
