package ie.sparehands.daos;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;

import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import ie.sparehands.entities.Applicant;

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
	
}
