package ie.sparehands.entities;

import java.io.Serializable;
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
	@JoinColumn(name = "owner_id")
	private Integer owner_id;	
	@Column(name = "title") 
	private String title;	
	@Column(name = "description") 
	private String description;	
	@Column(name = "reward") 
	private String reward;	
	@Column(name = "location") 
	private String location;	
    @Column(name = "date", length = 19)
    private Date date; 
	@Column(name = "picture_url") 
	private String picture_url;
	
	public Job() {
		super();
	}

	public Job(Integer owner_id, String title, String description, String reward,
			String location, Date date, String picture_url) {
		super();
		this.owner_id = owner_id;
		this.title = title;
		this.description = description;
		this.reward = reward;
		this.location = location;
		this.date = date;
		if(picture_url.equals("")){
			this.picture_url = "resources/img/StockJobImage.jpg";
		}
		else{
			this.picture_url = picture_url;
		}
		
	}

	public Integer getOwnerId() {
		return owner_id;
	}

	public void setOwnerId(Integer owner_id) {
		this.owner_id = owner_id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getReward() {
		return reward;
	}

	public void setReward(String reward) {
		this.reward = reward;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}
	@Temporal(TemporalType.TIMESTAMP)
	public Date getDate() {
		return date;
	}

	public void setDate(java.sql.Timestamp date) {
		this.date = date;
	}

	public String getPicture_url() {
		return picture_url;
	}

	public void setPicture_url(String picture_url) {
		this.picture_url = picture_url;
	}

	public Integer getId() {
		return id;
	}
   
}
