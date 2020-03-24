const dateTimeFormat = Intl.DateTimeFormat('pt-br', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
});
const formatDate = date => dateTimeFormat.format(new Date(date));

export default formatDate;