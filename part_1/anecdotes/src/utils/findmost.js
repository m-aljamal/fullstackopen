export  const  findMostVotes = (points) => {
    let most;
    let number = 0;
    for (const p in points) {
      if (points[p] > number) {
        most = p;
        number = points[p];
      }
    }
    return most;
  };