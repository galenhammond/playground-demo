import moment from 'moment'

export const EpochTimeConversion = (epochTime) => {
	timestamp = moment.unix(epochTime);
	return moment.format(timestamp.format('mm/ss'));
}

export const DateConversion = (date) => {
	return moment(date).fromNow();
}