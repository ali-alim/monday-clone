import { Link } from "react-router-dom";
import AvatarDisplay from "./AvatarDisplay";
import StatusDisplay from "./StatusDisplay";
import PriorityDisplay from "./PriorityDisplay";
import ProgressDisplay from "./ProgressDisplay";
import DeleteBlock from "./DeleteBlock";

// const url = "http://localhost:5000"
const url = "https://monday-ali.herokuapp.com"

const TicketCard = ({ ticket, color, index }) => {
  return (
    <div className="ticket-card">
      <Link to={`${url}/tickets/${ticket._id}`} id="link" className="link-elements">
          <div className="links" style={{width:"20px",textAlign:"center",fontWeight:"bold",textDecoration:"underline"}}>{index+1}</div>
          <div className="links"><h3>{ticket.title}</h3></div>
          <div className="links"><h4>{ticket.description}</h4></div>
          <div className="links"><AvatarDisplay ticket={ticket} /></div>
          <div className="links"><StatusDisplay status={ticket.status} /></div>
          <div className="links"><PriorityDisplay priority={ticket.priority}/></div>
          <div className="links"><ProgressDisplay  progress={ticket.progress}/></div>
      </Link>
      <DeleteBlock className="tickets-delete" documentId={ticket._id}/>
    </div>
  );
};

export default TicketCard;
