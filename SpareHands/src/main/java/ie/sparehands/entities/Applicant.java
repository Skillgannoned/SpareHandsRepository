package ie.sparehands.entities;

import java.io.Serializable;

import javax.persistence.*;

/**
 * Entity implementation class for Entity: applicant
 *
 */
@Entity
@Table(name="applicant")
public class Applicant implements Serializable {

	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
	@ManyToOne
	@JoinColumn(name = "owner_id")
	private User owner;
	@ManyToOne
	@JoinColumn(name = "applicant_id")
	private User applicant;
	@ManyToOne
	@JoinColumn(name = "job_id")
	private Job job;	
	@Column(name="status")
	private boolean status;
	
	public Applicant() {
		super();
	}

	public Applicant(User owner, User applicant, Job job) {
		super();
		this.owner = owner;
		this.applicant = applicant;
		this.job = job;
	}

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Integer getId() {
		return id;
	}

	public User getOwner() {
		return owner;
	}

	public User getApplicant() {
		return applicant;
	}

	public Job getJob() {
		return job;
	}
  
}
