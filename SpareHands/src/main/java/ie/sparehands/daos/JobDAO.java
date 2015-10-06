package ie.sparehands.daos;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import ie.sparehands.entities.Job;

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
	
	public List<Object[]> getAllByOwnerId(final int ownerId) {
		final Query query = entityManager.createQuery("SELECT u.id "
				+ "FROM Job u "
				+ "WHERE u.owner_id = 1");
//		query.setParameter("ownerId", ownerId);
		final List<Object[]> results = query.getResultList();
		return results;
	}
	
}
