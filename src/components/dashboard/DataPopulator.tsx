import { useCallback, useMemo } from 'react';
import { useUser } from '../../hooks/useUser';
import Button from '../ui/Button';
import { api } from '../../../api/requests';
import React from 'react';
import {SettingsCreateSettingsRequest, SettingsNotificationType} from "../../../api/openapi";
import {useFinance} from "../../provider/FinanceContentProvider";
import {useLevels} from "../../provider/LevelProvider";
import {useMeditate} from "../../provider/MeditationContentProvider";
import {useAuthentication} from "../../provider/AuthenticationProvider";

const DataPopulator = () => {
  const { user } = useUser();
  const {getSpendings} = useFinance();
  const {getLevels} = useLevels();
  const {getMeditations} = useMeditate();
  const {getUser} = useAuthentication();

  const settingsData: SettingsCreateSettingsRequest = useMemo(() => ({
    elevator: {
      amountNotifications: 0,
      goal: 10,
      notifications: true,
      periodNotifications: "Day" as SettingsNotificationType,
    },
    enabledPlugins: ["finance", "meditation", "elevator"],
    finance: {
      amountNotifications: 0,
      investmentGoal: 600,
      investmentTimeGoal: 10,
      notifications: true,
      periodNotifications: "Day" as SettingsNotificationType,
      strategy: "Percent",
      strategyAmount: 5,
    },
    meditation: {
      amountNotifications: 0,
      meditationTimeGoal: 170000,
      notifications: true,
      periodNotifications: "Day" as SettingsNotificationType,
    },
  }), []);

  const meditationDataArray = useMemo(() => [
    { endTime: 1672445500, meditationTime: 1395 },
    { endTime: 1672618430, meditationTime: 1338 },
    { endTime: 1672704670, meditationTime: 1496 },
    { endTime: 1672963866, meditationTime: 1617 },
    { endTime: 1673050441, meditationTime: 1317 },
    { endTime: 1673136618, meditationTime: 1666 },
    { endTime: 1673482226, meditationTime: 1436 },
    { endTime: 1673828088, meditationTime: 1528 },
    { endTime: 1673914238, meditationTime: 1424 },
    { endTime: 1674432622, meditationTime: 1379 },
    { endTime: 1674864681, meditationTime: 1608 },
    { endTime: 1675469674, meditationTime: 1548 },
    { endTime: 1675901458, meditationTime: 1553 },
    { endTime: 1676506332, meditationTime: 1307 },
    { endTime: 1676592758, meditationTime: 1319 },
    { endTime: 1677024816, meditationTime: 1353 },
    { endTime: 1677284071, meditationTime: 1648 },
    { endTime: 1677888641, meditationTime: 1539 },
    { endTime: 1678320729, meditationTime: 1362 },
    { endTime: 1678925689, meditationTime: 1457 },
    { endTime: 1679184815, meditationTime: 1442 },
    { endTime: 1679271249, meditationTime: 1412 },
    { endTime: 1679616721, meditationTime: 1539 },
    { endTime: 1680221472, meditationTime: 1580 },
    { endTime: 1680307824, meditationTime: 1685 },
    { endTime: 1680826357, meditationTime: 1562 },
    { endTime: 1681171968, meditationTime: 1313 },
    { endTime: 1681258250, meditationTime: 1458 },
    { endTime: 1681776819, meditationTime: 1381 },
    { endTime: 1682208764, meditationTime: 1473 },
    { endTime: 1682727197, meditationTime: 1580 },
    { endTime: 1683331990, meditationTime: 1614 },
    { endTime: 1683850235, meditationTime: 1415 },
    { endTime: 1683936825, meditationTime: 1653 },
    { endTime: 1684282492, meditationTime: 1609 },
    { endTime: 1684714477, meditationTime: 1429 },
    { endTime: 1685232819, meditationTime: 1567 },
    { endTime: 1685319037, meditationTime: 1497 },
    { endTime: 1685578275, meditationTime: 1382 },
    { endTime: 1686010424, meditationTime: 1315 },
    { endTime: 1686442217, meditationTime: 1497 },
    { endTime: 1686701689, meditationTime: 1512 },
    { endTime: 1686787841, meditationTime: 1609 },
    { endTime: 1687220014, meditationTime: 1600 },
    { endTime: 1687651958, meditationTime: 1324 },
    { endTime: 1688170365, meditationTime: 1619 },
    { endTime: 1688688823, meditationTime: 1446 },
    { endTime: 1689293419, meditationTime: 1488 },
    { endTime: 1689380057, meditationTime: 1509 },
    { endTime: 1689812096, meditationTime: 1326 },
    { endTime: 1690243945, meditationTime: 1557 },
    { endTime: 1690416883, meditationTime: 1412 },
    { endTime: 1690503052, meditationTime: 1633 },
    { endTime: 1690762430, meditationTime: 1505 }
  ], []);

  const financeDataArray = useMemo(() => [
    {
      amount: 218,
      description: 'Electronics',
      saving: 5,
      spendingTime: 1672444800
    },
    {
      amount: 446,
      description: 'Electronics',
      saving: 17,
      spendingTime: 1672704000
    },
    {
      amount: 292,
      description: 'Utilities',
      saving: 6,
      spendingTime: 1673049600
    },
    {
      amount: 226,
      description: 'Electronics',
      saving: 11,
      spendingTime: 1673740800
    },
    {
      amount: 251,
      description: 'Utilities',
      saving: 20,
      spendingTime: 1674086400
    },
    {
      amount: 203,
      description: 'Electronics',
      saving: 16,
      spendingTime: 1674604800
    },
    {
      amount: 58,
      description: 'Groceries',
      saving: 17,
      spendingTime: 1675036800
    },
    {
      amount: 453,
      description: 'Utilities',
      saving: 4,
      spendingTime: 1676160000
    },
    {
      amount: 168,
      description: 'Groceries',
      saving: 10,
      spendingTime: 1676851200
    },
    {
      amount: 563,
      description: 'Entertainment',
      saving: 2,
      spendingTime: 1677283200
    },
    {
      amount: 271,
      description: 'Utilities',
      saving: 17,
      spendingTime: 1678492800
    },
    {
      amount: 592,
      description: 'Electronics',
      saving: 10,
      spendingTime: 1678924800
    },
    {
      amount: 239,
      description: 'Electronics',
      saving: 7,
      spendingTime: 1679788800
    },
    {
      amount: 92,
      description: 'Electronics',
      saving: 9,
      spendingTime: 1680825600
    },
    {
      amount: 589,
      description: 'Utilities',
      saving: 4,
      spendingTime: 1681603200
    },
    {
      amount: 199,
      description: 'Rent',
      saving: 15,
      spendingTime: 1681689600
    },
    {
      amount: 536,
      description: 'Utilities',
      saving: 2,
      spendingTime: 1681862400
    },
    {
      amount: 271,
      description: 'Utilities',
      saving: 12,
      spendingTime: 1683072000
    },
    {
      amount: 164,
      description: 'Utilities',
      saving: 13,
      spendingTime: 1683331200
    },
    {
      amount: 367,
      description: 'Electronics',
      saving: 16,
      spendingTime: 1683417600
    },
    {
      amount: 573,
      description: 'Rent',
      saving: 15,
      spendingTime: 1683676800
    },
    {
      amount: 408,
      description: 'Entertainment',
      saving: 16,
      spendingTime: 1684627200
    },
    {
      amount: 306,
      description: 'Rent',
      saving: 16,
      spendingTime: 1684800000
    },
    {
      amount: 319,
      description: 'Utilities',
      saving: 18,
      spendingTime: 1685577600
    },
    {
      amount: 253,
      description: 'Rent',
      saving: 16,
      spendingTime: 1686268800
    },
    {
      amount: 231,
      description: 'Rent',
      saving: 9,
      spendingTime: 1686528000
    },
    {
      amount: 130,
      description: 'Entertainment',
      saving: 14,
      spendingTime: 1687305600
    },
    {
      amount: 503,
      description: 'Entertainment',
      saving: 0,
      spendingTime: 1687910400
    },
    {
      amount: 549,
      description: 'Entertainment',
      saving: 10,
      spendingTime: 1688515200
    },
    {
      amount: 542,
      description: 'Groceries',
      saving: 20,
      spendingTime: 1689033600
    },
    {
      amount: 529,
      description: 'Groceries',
      saving: 6,
      spendingTime: 1690070400
    },
    {
      amount: 502,
      description: 'Groceries',
      saving: 18,
      spendingTime: 1690156800
    },
    {
      amount: 504,
      description: 'Rent',
      saving: 8,
      spendingTime: 1690502400
    }
  ], []);

  const populateSettings = useCallback(async () => {
    if (!user?.id) return;
    try {
      // First, delete the existing settings
      await api.settingsApi.settingsDelete(user.id);

      // Then, create new settings
      await api.settingsApi.settingsPost(user.id, settingsData);
    } catch (e) {
      console.log(e);
    }
  }, [user?.id, settingsData]);


  const populateMeditation = useCallback(async () => {
    if (!user?.id) return;
    try {
      for (const meditationData of meditationDataArray) {
        await api.meditationApi.meditationPost(user.id, meditationData);
      }
    } catch (e) {
      console.log(e);
    }
  }, [user?.id, meditationDataArray]);

  const populateFinance = useCallback(async () => {
    if (!user?.id) return;
    try {
      for (const financeData of financeDataArray) {
        await api.financeApi.financePost(user.id, financeData);
      }
    } catch (e) {
      console.log(e);
    }
  }, [user?.id, financeDataArray]);

  const handlePopulateData = async () => {
    //await Promise.all([populateSettings(), populateMeditation(), populateFinance()]);
    await Promise.all([populateSettings()]);
    await Promise.all([populateMeditation()]);
    await Promise.all([populateFinance()]);
    await Promise.all([getSpendings()]);
    await Promise.all([getMeditations()]);
    await Promise.all([getUser()]);
    await Promise.all([getLevels()]);

    //await Promise.all([getSpendings(), getMeditations(), getUser(), getLevels()])
    alert('Data has been populated!');
  };

  return <Button small buttonType={'black'} onPress={handlePopulateData}>Populate Data</Button>;
};

export default DataPopulator;