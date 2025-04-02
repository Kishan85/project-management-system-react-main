import { React, useEffect, useState } from 'react';
import { Icon } from '../../components/Component';
import { set } from 'react-hook-form';
import { startTaskAPI } from '../../api/todo';
import { toast } from 'react-toastify';
import moment from 'moment';


const Timer = (props) => {

  const [seconds, setSeconds] = useState(parseInt(props.data.task_duration ? props.data.task_duration : 0));
  const [isRunning, setIsRunning] = useState(false);
  const [isStart, setStart] = useState(false);
  const [startTask, setStartTask] = useState(false);

  const [savedData, setSavedData] = useState(JSON.parse(localStorage.getItem('task_data')));
 

  useEffect(() => {
    if (savedData) {
      if (savedData.task_id === props.data.task_id) {
        if (savedData.status === 'running') {
          setIsRunning(true);
          setStart(true);
          setStartTask(true);
          setSeconds(Math.floor((new Date() - new Date(savedData.start_time)) / 1000));
        }
      }
    }
  }, [savedData]);



  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const toggleTimer = () => {
    const confirmSubmit = window.confirm("Do you want start a task?");
    if (confirmSubmit) {
      const bodyData = {
        task_id: props.data.task_id,
        user_id: parseInt(props.data.user_id[0].value),
        task_status: startTask ? 'stop' : 'start',
      }
      startTaskAPI(bodyData)
        .then((res) => {
          if (res.data.status === "success") {
            localStorage.setItem('task_data', JSON.stringify(res.data.data));
            setIsRunning(!isRunning);
            setStart(!isStart);
            setStartTask(!startTask);
            toast.success(res.data.message);
          } else if (res.data.status === "failed") {
            toast.error(res.data.message);
            setStart(false);
            setIsRunning(false);
          } else if (res.data.status === "expired") {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log("something went wrong");
        });

    }
  }

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')} : ${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };



  return (
    <>
      <div className='d-flex g-1 align-items-center'>


        {

          props.status == 'In Progress' &&
          <>
            <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center' }}>
              {
                !isStart ? (<button className='play-stop' style={{ width: '20px', height: '20px', borderRadius: '20px', border: '1px solid #798bff', background: '#fff' }} onClick={toggleTimer}>
                  <Icon name="play" style={{ color: '#798bff', fontSize: '16px' }}></Icon>
                </button>) : <button className='play-stop' style={{ width: '20px', height: '20px', borderRadius: '20px', border: '1px solid #798bff', background: '#fff' }} onClick={toggleTimer}>
                  <Icon name="stop" style={{ color: '#798bff', fontSize: '16px' }}></Icon>
                </button>
              }
              <span style={{ fontSize: '12px', marginLeft: '5px' }}>{formatTime(seconds)}</span>
            </div>
            <div>
              <p style={{ fontSize: '12px', marginBottom: '2px' }}></p>
            </div>

          </>

        }


      </div>

    </>
  );


}

export default Timer;