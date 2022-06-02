import { Link } from "react-router-dom";
import AvatarDisplay from "./AvatarDisplay";
import StatusDisplay from "./StatusDisplay";
import PriorityDisplay from "./PriorityDisplay";
import ProgressDisplay from "./ProgressDisplay";
import DeleteBlock from "./DeleteBlock";

const TicketCard = ({ ticket, color }) => {
  return (
    <div className="ticket-card">
      <Link to={`/tickets/${ticket._id}`} id="link" className="link-elements">
          <div className="links ticket-color" style={{backgroundColor:color}}> </div>
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
