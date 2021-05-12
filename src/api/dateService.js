import moment from "moment";
import "moment/locale/es"; // without this line it didn't work
import "moment-timezone";

export const getDateFiltered = (date) =>{
    const newDate = moment(date).format("DD MMMM YYYY, h:mm a");
    return newDate;
};
