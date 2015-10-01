package ie.sparehands.entities;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "forename") 
    private String forename; 
    @Column(name = "surname")
    private String surname;
    @Column(name = "email") 
    private String email; 
    @Column(name = "password")
    private String password;
    @Column(name = "dob")
    private java.sql.Timestamp dob; 
    @Column(name = "picture_url")
    private String picture_url;

    
	public User() {
		super();
	}

	public User(String forename, String surname, String email, String password,
			Timestamp dob, String picture_url) {
		super();
		this.forename = forename;
		this.surname = surname;
		this.email = email;
		this.password = password;
		this.dob = dob;
		if(picture_url.equals("")){
			this.picture_url = "resources/img/StockProfileImage.jpg";
		}
		else{
			this.picture_url = picture_url;
		}
	}

	public Integer getId() {
		return id;
	}

	public String getForename() {
		return forename;
	}

	public void setForename(String forename) {
		this.forename = forename;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public java.sql.Timestamp getDob() {
		return dob;
	}

	public void setDob(java.sql.Timestamp dob) {
		this.dob = dob;
	}

	public String getPicture_url() {
		return picture_url;
	}

	public void setPicture_url(String picture_url) {
		this.picture_url = picture_url;
	}

	
}

