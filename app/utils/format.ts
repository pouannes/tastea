const formatTime = (time: number): string => {
  if (time < 60) return `${time}s`;
  if (time % 60 === 0) return `${time / 60}min`;
  if (time % 60 < 30) return `${Math.floor(time / 60)}min`;
  return `${Math.floor(time / 60)}min30`;
};

export { formatTime };
