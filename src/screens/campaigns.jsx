import React, { Component } from "react";
import "../styles/campaigns.scss";
import MenuBar from "../components/menuBar";
import { connect } from "react-redux";
import { getCampaigns, setCampaigns } from "../store/actions/campaignAction";
class Campaigns extends Component {
  state = {
    menuDataArray: [
      { name: "Upcoming Campaigns", selected: true },
      { name: "Live Campaigns", selected: false },
      { name: "Past Campaigns", selected: false }
    ]
  };

  constructor(props) {
    super(props);
    this.props.getCampaigns();
  }

  onMenuChange = selectedName => {
    this.state.menuDataArray.map(m => {
      if (m.name === selectedName) {
        m.selected = true;
      } else {
        m.selected = false;
      }
      return m;
    });
    this.setState({ ...this.state, menuDataArray: this.state.menuDataArray });
    console.log("camp", this.props.campaigns);
  };

  getCampaignDate = campaignDate => {
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

  getDateDiff = campaignDate => {
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

  getTableBody = () => {
    return this.props.campaigns.data.map((c, index) => {
      return (
        <tr key={index}>
          <td>
            <div>
              <div>{this.getCampaignDate(c.createdOn)}</div>
              <div>{this.getDateDiff(c.createdOn)}</div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <div>
                <img
                  src={require("../assets/icons/" + c.image_url)}
                  alt="App Image"
                  width="40px"
                  height="40px"
                />
              </div>
              <div className="ml-2">
                <div>{c.name}</div>
                <div>{c.region}</div>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <div>
                <img
                  src={require("../assets/icons/Price.png")}
                  alt="Price Image"
                  width="25px"
                  height="25px"
                />
              </div>
              <div className="ml-2">
                <span>View Pricing</span>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex justify-content-between">
              <div>
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      src={require("../assets/icons/file.png")}
                      alt="Price Image"
                      width="25px"
                      height="25px"
                    />
                  </div>
                  <div className="ml-2">
                    <span>CSV</span>
                  </div>
                </div>
              </div>
              <div className="mx-2">
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      src={require("../assets/icons/statistics-report.png")}
                      alt="Price Image"
                      width="25px"
                      height="25px"
                    />
                  </div>
                  <div className="ml-2">
                    <span>Report</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      src={require("../assets/icons/calendar.png")}
                      alt="Price Image"
                      width="25px"
                      height="25px"
                    />
                  </div>
                  <div className="ml-2">
                    <span>Schedule Again</span>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="screen-container campaigns">
          <main>
            <h1>Manage Campaigns</h1>
            <div>
              <MenuBar
                menuData={this.state.menuDataArray}
                handleMenuChange={this.onMenuChange}
              />
            </div>
            <div className="campaigns-table mt-4">
              <table className="shadow">
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>CAMPAIGN</th>
                    <th>VIEW</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>{this.getTableBody()}</tbody>
              </table>
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  campaigns: state.campaigns
});

const mapDispatchToProps = dispatch => ({
  getCampaigns: () => dispatch(getCampaigns()),
  setCampaigns: updatedData => dispatch(setCampaigns(updatedData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Campaigns);
