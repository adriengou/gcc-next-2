export const handlePrismaError = (route: string, err: any) => {
  switch (err.code) {
    case "P2002":
      // handling duplicate key errors
      return `${route} already exists`;
    case "P2014":
      // handling invalid id errors
      return `Invalid ID: ${err.meta.target}`;
    case "P2003":
      // handling invalid data errors
      return `Invalid input data: ${err.meta.target}`;
    default:
      // handling all other errors
      return `Something went wrong: ${err.message}`;
  }
};
