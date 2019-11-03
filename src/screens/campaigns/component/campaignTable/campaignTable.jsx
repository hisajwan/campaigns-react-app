import React, { useRef } from "react";
import "./campaignTable.scss";
import AppCalendar from "../../../../components/appCalendar/appCalendar";
const CampaignTable = ({
  tableHeader,
  tableData,
  showPricing,
  selectedCampaignType
}) => {
  const calendarRef = useRef();
  const getCampaignDate = campaignDate => {
    let date = new Date(campaignDate);
    const monthArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];
    let dateToShow = `${
      monthArray[date.getMonth()]
    } ${date.getFullYear()}, ${date.getDate()}`;

    return <span>{dateToShow}</span>;
  };

  const getDateDiff = campaignDate => {
    let dateToShow;
    const date = new Date();
    const todaysDate = date.getTime();
    const difference = campaignDate - todaysDate;
    const diffInDays = Math.floor(difference / (1000 * 3600 * 24));
    if (Math.sign(diffInDays) === 1) {
      dateToShow = `${Math.abs(diffInDays)} days ahead`;
    } else if (Math.sign(diffInDays) === 0) {
      dateToShow = `Today`;
    } else {
      dateToShow = `${Math.abs(diffInDays)} days ago`;
    }
    return <span>{dateToShow}</span>;
  };

  return (
    <React.Fragment>
      <div className="campaigns-table shadow">
        <div className="grid-container">
          <div className="grid-header">
            <div className="grid-row grid-header-row">
              {tableHeader.map((header, index) => (
                <div key={`header-${index}`}>{header}</div>
              ))}
            </div>
          </div>
          <div className="grid-body">
            {tableData.map((c, index) => (
              <div className="grid-row grid-body-row" key={index}>
                <div>
                  <div className="grid-large-font">
                    {getCampaignDate(c.createdOn)}
                  </div>
                  <div className="font-italic grid-light-color">
                    {getDateDiff(c.createdOn)}
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      src={require("../../../../assets/icons/" + c.image_url)}
                      alt="App"
                      width="40px"
                      height="40px"
                    />
                  </div>
                  <div className="ml-2">
                    <div className="grid-large-font">{c.name}</div>
                    <div className="font-italic grid-light-color">
                      {c.region}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div
                    className="cursor-pointer"
                    onClick={() => showPricing(c)}
                  >
                    <img
                      src={require("../../../../assets/icons/Price.png")}
                      alt="Price"
                      width="25px"
                      height="25px"
                    />
                  </div>
                  <div
                    className="ml-2 cursor-pointer"
                    onClick={() => showPricing(c)}
                  >
                    <span>View Pricing</span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <a href={c.csv} className="d-flex align-items-center">
                      <div className="cursor-pointer">
                        <img
                          src={require("../../../../assets/icons/file.png")}
                          alt="CSV"
                          width="25px"
                          height="25px"
                        />
                      </div>
                      <div className="ml-2 cursor-pointer">
                        <span>CSV</span>
                      </div>
                    </a>
                  </div>
                  <div className="mx-2">
                    <a href={c.report} className="d-flex align-items-center">
                      <div className="cursor-pointer">
                        <img
                          src={require("../../../../assets/icons/statistics-report.png")}
                          alt="Report"
                          width="25px"
                          height="25px"
                        />
                      </div>
                      <div className="ml-2 cursor-pointer">
                        <span>Report</span>
                      </div>
                    </a>
                  </div>
                  <div>
                    <div className="d-flex align-items-center">
                      <div
                        onClick={() => calendarRef.current.handleShow(c)}
                        className="cursor-pointer"
                      >
                        <img
                          src={require("../../../../assets/icons/calendar.png")}
                          alt="Calendar"
                          width="25px"
                          height="25px"
                        />
                      </div>
                      <div
                        onClick={() => calendarRef.current.handleShow(c)}
                        className="ml-2 cursor-pointer"
                      >
                        <span>Schedule Again</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {tableData.length < 1 && (
        <h3 className="text-center p-4">No {selectedCampaignType[0].name}</h3>
      )}
      <AppCalendar ref={calendarRef} />
    </React.Fragment>
  );
};

export default CampaignTable;
