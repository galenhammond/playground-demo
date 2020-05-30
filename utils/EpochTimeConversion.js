import moment from 'moment'

const EpochTimeConversion = (epochTime) => {
	timestamp = moment.unix(epochTime);
	return moment.format(timestamp.format('mm/ss');
}
export EpochTimeConversion;