// Converts seconds to minutes in the format MM:SS
export default sec => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec - (minutes * 60);
    return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}