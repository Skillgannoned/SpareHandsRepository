package ie.sparehands.entities;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.*;

/**
 * Entity implementation class for Entity: Job
 *
 */
@Entity
@Table(name="job")
public class Job implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
	@ManyToOne
	@JoinColumn(name = "owner_id")
	private User owner;		
	@Column(name = "title") 
	private String title;	
	@Column(name = "description") 
	private String description;	
	@Column(name = "reward") 
	private String reward;	
	@Column(name = "location") 
	private String location;	
	@Temporal(TemporalType.DATE)
    @Column(name = "date", length = 19)
    private Date date; 
	
	public Job() {
		super();
	}

	public Job(User owner, String title, String description, String reward,
			String location, Date date) {
		super();
		this.owner = owner;
		this.title = title;
		this.description = description;
		this.reward = reward;
		this.location = location;
		this.date = date;
	}

	public User getOwner() {
		return owner;
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	public String getReward() {
		return reward;
	}
	
	public String getLocation() {
		return location;
	}

	public String getDate() throws ParseException {
		DateFormat parser = new SimpleDateFormat("dd-MM-yyyy");
		String fDate = parser.format(date);
		return fDate;
	}

	public Integer getId() {
		return id;
	}
   
}
