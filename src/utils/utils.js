export const formatIMDBArrayResponse = (response) => {
  let moviesFromResponse = [];
  for (let result of response) {
    if (result.title !== undefined && result.title !== " ") {
      moviesFromResponse.push({
        title: result.title,
        imageUrl: result.image === undefined ? undefined : result.image.url,
        id: result.id.split("/")[2],
        type: result.titleType,
        year: result.year,
        min: result.runningTimeInMinutes,
        actors:
          result.principals === undefined
            ? "--"
            : result.principals.map((actor) => actor.name).toString(),
      });
    }
  }
  return moviesFromResponse;
};
