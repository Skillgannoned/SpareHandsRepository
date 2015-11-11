package ie.sparehands.daos;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import ie.sparehands.entities.Applicant;
import ie.sparehands.entities.Job;

@Stateless
@LocalBean
public class ApplicantDAO {

	@PersistenceContext
	private EntityManager entityManager;
	
	public List<Applicant> getAllApplicants() {
		final Query query = entityManager.createQuery("SELECT u FROM Applicant u");
		return query.getResultList();
	}

	public Applicant getApplicant(final int id) {
		return entityManager.find(Applicant.class, id);
	}

	public void save(final Applicant applicant) {
		entityManager.persist(applicant);
	}  

	public void update(final Applicant applicant) {
		entityManager.merge(applicant);
	}  

	public void delete(final int id) {
		entityManager.remove(getApplicant(id));
	}

	public List<Applicant> getApplicationsByApplicantId(int id) {
		List<Applicant> applications = null;
		final Query query=entityManager.createQuery("SELECT a FROM Applicant a"
				+ " WHERE a.applicant.id = :id ");
		query.setParameter("id", id);
		try {
			applications =  query.getResultList();
		} catch (EntityNotFoundException | NonUniqueResultException e) {
			e.printStackTrace();
		}
		return applications;
	}

	public List<Applicant> findApplicationsByOwnerId(int id) {
		List<Applicant> applications = null;
		final Query query=entityManager.createQuery("SELECT a FROM Applicant a"
				+ " WHERE a.owner.id = :id ");
		query.setParameter("id", id);
		try {
			applications =  query.getResultList();
		} catch (EntityNotFoundException | NonUniqueResultException e) {
			e.printStackTrace();
		}
		return applications;
	}
	
}
