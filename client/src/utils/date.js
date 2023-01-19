import moment from "moment";
import 'moment/locale/ru'

export const getTodayDate = () => moment().locale("ru");
