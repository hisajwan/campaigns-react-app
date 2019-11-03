import React, { useState, useImperativeHandle, forwardRef } from "react";
import { useDispatch } from "react-redux";
import Calendar from "react-calendar";
import { Modal } from "react-bootstrap";
import { getImageURL } from "../../util/util";
import { setCampaigns } from "../../store/actions/campaignAction";

const AppCalendar = React.memo(
  forwardRef((props, ref) => {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [campaignDetails, setCampaignDetails] = useState({
      name: "",
      region: "",
      createdOn: "",
      price: [],
      csv: "",
      report: "",
      image_url: ""
    });
    const dispatch = useDispatch();

    const handleClose = () => setShow(false);
    useImperativeHandle(ref, () => ({
      handleShow(details) {
        setCampaignDetails(details);
        let date = new Date(details.createdOn);
        setDate(date);
        setShow(true);
      }
    }));

    const onDateChange = date => {
      setDate(date);
    };
    const rescheduleCampaign = () => {
      dispatch(setCampaigns({ ...campaignDetails, createdOn: date.getTime() }));
      handleClose();
    };
    return (
      <Modal
        className="app-modal"
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <div className="d-flex align-items-end">
            <div>
              {getImageURL(campaignDetails.image_url).map(image_url => (
                <img
                  key="image"
                  src={image_url}
                  alt="App"
                  width="100px"
                  height="100px"
                />
              ))}
            </div>
            <div className="ml-2">
              <div className="large-font">{campaignDetails.name}</div>
              <div className="font-italic light-color">
                {campaignDetails.region}
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Calendar value={date} onChange={date => onDateChange(date)} />
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <button
            className="btn btn-outline-success"
            onClick={() => rescheduleCampaign()}
          >
            Reschedule
          </button>
          <button className="btn btn-outline-secondary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  })
);

export default AppCalendar;
