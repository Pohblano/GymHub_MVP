import { useContext, useMemo } from 'react';
import { GymContext } from '@/context/Gym.context';

export const useGymSelector = (selector) => {
  const context = useContext(GymContext);
  const selectedState = useMemo(() => selector(context), [context, selector]);
  return selectedState;
};