package ie.sparehands.entities;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.*;

/**
 * Entity implementation class for Entity: Advert
 *
 */
@Entity
@Table(name="advert")
public class Advert implements Serializable {

	
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
    @Column(name = "date")
    private java.sql.Timestamp date; 
	@Column(name = "picture_url") 
	private String picture_url;
	
	public Advert() {
		super();
	}

	public Advert(User owner, String title, String description, String reward,
			String location, Timestamp date, String picture_url) {
		super();
		this.owner = owner;
		this.title = title;
		this.description = description;
		this.reward = reward;
		this.location = location;
		this.date = date;
		if(picture_url.equals("")){
			this.picture_url = "resources/img/StockAdvertImage.jpg";
		}
		else{
			this.picture_url = picture_url;
		}
		
	}

	public User getUser() {
		return owner;
	}

	public void setUser(User owner) {
		this.owner = owner;
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

	public java.sql.Timestamp getDate() {
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
