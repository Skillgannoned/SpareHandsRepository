package ie.sparehands.daos;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import ie.sparehands.entities.Job;
import ie.sparehands.entities.User;

@Stateless
@LocalBean
public class JobDAO {

	@PersistenceContext
	private EntityManager entityManager;
	
	public List<Job> getAllJobs() {
		final Query query = entityManager.createQuery("SELECT u FROM Job u");
		return query.getResultList();
	}

	public Job getJob(final int id) {
		return entityManager.find(Job.class, id);
	}

	public void save(final Job job) {
		entityManager.persist(job);
	}  

	public void update(final Job job) {
		entityManager.merge(job);
	}  

	public void delete(final int id) {
		entityManager.remove(getJob(id));
	}

	public List<Job> getJobBySearchKey(String searchKey) {
		List<Job> jobs = null;
		final Query query=entityManager.createQuery("SELECT j FROM Job j"
				+ " WHERE j.title LIKE :searchKey "
				+ " OR j.description LIKE :searchKey "
				+ " OR j.location LIKE :searchKey");
		query.setParameter("searchKey", "%"+searchKey+"%");
		try {
			jobs =  query.getResultList();
		} catch (EntityNotFoundException | NonUniqueResultException e) {
			e.printStackTrace();
		}
		return jobs;
	}
	
}
