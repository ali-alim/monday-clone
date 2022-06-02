import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CategoriesContext from "./../context";

const TicketPage = ({ editMode }) => {
  const [ticket, setTicket] = useState({
    status:"not started", progress:0
  });

  const navigate = useNavigate();
  let { id } = useParams();


  const { categories, setCategories } = useContext(CategoriesContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(editMode) {
      const response = await axios.put(`http://localhost:5000/tickets/${id}`, {
        data: ticket
      })
      const success = response.status === 200;
      if (success) {
        navigate('/');
      } else {console.log("error")}
    }
    if(!editMode) {
    await axios.post("http://localhost:5000/tickets", ticket);

    console.log(`ticket -> ON SUBMIT:`, ticket);

    navigate("/");
    }
  }; 

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:5000/ticket/${id}`);
    setTicket(response.data.data);
  };

  useEffect(() => {
    if (editMode) fetchData();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setTicket((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="ticket">
      <h1>{editMode ? "Update Your Ticket" : "Create a Ticket"}</h1>
      <div className="ticket-container">
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={handleChange}
              required={true}
              value={ticket.title}
            />

            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              type="text"
              onChange={handleChange}
              required={true}
              value={ticket.description}
            />

            <label>Category</label>
            <select
              name="category"
              value={ticket.category || "New Category"}
              onChange={handleChange}
            >
              {categories?.map((category, _index) => (
                <option key={_index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <label htmlFor="new-category">New Category</label>
            <input
              id="new-category"
              name="category"
              type="text"
              onChange={handleChange}
              value={ticket.category}
            />

            <label>Priority</label>
            <div className="multiple-input-container">
              <input
                id="priority-1"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={1}
                checked={ticket.priority == 1}
              />
              <label htmlFor="priority-1">1</label>

              <input
                id="priority-2"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={2}
                checked={ticket.priority == 2}
              />
              <label htmlFor="priority-2">2</label>

              <input
                id="priority-3"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={3}
                checked={ticket.priority == 3}
              />
              <label htmlFor="priority-3">3</label>

              <input
                id="priority-4"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={4}
                checked={ticket.priority == 4}
              />
              <label htmlFor="priority-4">4</label>

              <input
                id="priority-5"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={5}
                checked={ticket.priority == 5}
              />
              <label htmlFor="priority-5">5</label>
            </div>

            {editMode && (
              <>
                <input
                  type="range"
                  id="progress"
                  name="progress"
                  value={ticket.progress}
                  // placeholder={ticket.progress}
                  min="0"
                  max="100"
                  onChange={handleChange}
                />
                <label htmlFor="progress">Progress</label>
                <label>Status</label>

                <select
                  name="status"
                  value={ticket.status}
                  onChange={handleChange}
                >
                  <option selected={ticket.status == "done"} value="done">
                    Done
                  </option>
                  <option
                    selected={ticket.status == "working on it"}
                    value="working on it"
                  >
                    Working on it
                  </option>
                  <option selected={ticket.status == "stuck"} value="stuck">
                    Stuck
                  </option>
                  <option
                    selected={ticket.status == "not started"}
                    value="not started"
                  >
                    Not Started
                  </option>
                </select>
              </>
            )}

            <input type="submit" />
          </section>

          <section>
            <label htmlFor="owner">Owner</label>
            <input
              id="owner"
              name="owner"
              type="owner"
              onChange={handleChange}
              required={true}
              value={ticket.owner}
            />

            <label htmlFor="avatar">Avatar</label>
            <input
              id="avatar"
              name="avatar"
              type="url"
              onChange={handleChange}
            />
            <div className="img-preview">
              {ticket.avatar && <img src={ticket.avatar} alt="image preview" />}
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default TicketPage;