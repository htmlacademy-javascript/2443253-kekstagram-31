//Принимает время начала и конца рабочего дня,
// а также время старта и продолжительность встречи в минутах и возвращает true,
// если встреча не выходит за рамки рабочего дня, и false, если выходит.
// @param {startWork} string
// @param {stopWork} string
// @param {startMeeting} string
// @param {meetingDuration} number
// @return {boolean}
const checkMeetingInWorktime = (startWork,stopWork,startMeeting,meetingDuration)=>{
  const startW = startWork.split(':');
  const stopW = stopWork.split(':');
  const startM = startMeeting.split(':');
  let startWorkMin = 0,
    stopWorkMin = 0,
    startMeetingMin = 0;

  if (startW[1] < 59 && stopW[1] < 59 && startM[1] < 59){
    //Сразу переведем в минуты от начала суток
    startWorkMin = +startW[0] * 60 + (+startW[1]);
    stopWorkMin = +stopW[0] * 60 + (+stopW[1]);
    startMeetingMin = +startM[0] * 60 + (+startM[1]);
    //Конец рабочего дня позже начала
    if (stopWorkMin < startWorkMin){
      return false;
    }

    //Проверяем
    if (startMeetingMin < startWorkMin){
      return false;
    } else if((startMeetingMin + meetingDuration) > stopWorkMin){
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }


};
//console.log(
checkMeetingInWorktime('01:5','5:45','1:50',70);
//);
