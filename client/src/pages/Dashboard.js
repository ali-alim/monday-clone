import { useState, useEffect, useContext} from "react";
import TicketCard from "./../components/TicketCard";
import axios from "axios";
import CategoriesContext from "../context";

const url = "http://localhost:5000"

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const {categories, setCategories} = useContext(CategoriesContext)

  useEffect(() => {
    axios
    .get(`${url}/tickets`)
    .then((response) => {
      const data = response.data;
      setTickets(data)
    })
    .catch(() => {
      alert('error retrieving data')
    });
  }, [tickets])



  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category))
  ];

  useEffect(() => {
    setCategories([...new Set(tickets?.map(({category}) => category))])
  },[tickets])

  const colors = [
    "rgb(255,179,186)",
    "rgb(255,223,186)",
    "rgb(255,255,186)",
    "rgb(186,255,201)",
    "rgb(186,255,255)",
  ];


  return (
    <div className="dashboard">
      <h1>My Projects</h1>
      <div className="ticket-container">

        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex}>
              {/* <h3>{uniqueCategory}</h3> */}
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket, _index) => (
                  <TicketCard
                  key={_index}
                  id={_index}
                  index={_index}
                  color={colors[categoryIndex] || colors[0]}
                  ticket={filteredTicket}
                />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;

