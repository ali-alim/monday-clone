import { Link } from "react-router-dom";
import AvatarDisplay from "./AvatarDisplay";
import StatusDisplay from "./StatusDisplay";
import PriorityDisplay from "./PriorityDisplay";
import ProgressDisplay from "./ProgressDisplay";
import DeleteBlock from "./DeleteBlock";

const TicketCard = ({ ticket, color }) => {
  return (
    <div className="ticket-card">
      <Link to={`/tickets/${ticket._id}`} id="link">
      <div className="ticket-color" style={{backgroundColor:color}}> </div>
        <h3>{ticket.title}</h3>
        <h4>{ticket.description}</h4>
        <AvatarDisplay ticket={ticket} />
        <StatusDisplay status={ticket.status} />
        <PriorityDisplay priority={ticket.priority}/>
        <ProgressDisplay  progress={ticket.progress}/>
      </Link>
      <DeleteBlock documentId={ticket._id}/>
    </div>
  );
};

export default TicketCard;
