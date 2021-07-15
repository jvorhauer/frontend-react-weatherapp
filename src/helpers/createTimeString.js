function createTimeString(ts) {
  const day = new Date(ts * 1000);
  return day.toLocaleTimeString([], );
}

export default createTimeString;
