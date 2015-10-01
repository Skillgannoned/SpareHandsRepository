package ie.sparehands.daos;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import ie.sparehands.entities.User;

@Stateless
@LocalBean
public class UserDAO {

	@PersistenceContext
	private EntityManager entityManager;
	
	public List<User> getAllUsers() {
		final Query query = entityManager.createQuery("SELECT u FROM User u");
		return query.getResultList();
	}

	public User getUser(final int id) {
		return entityManager.find(User.class, id);
	}

	public void save(final User user) {
		entityManager.persist(user);
	}  

	public void update(final User user) {
		entityManager.merge(user);
	}  

	public void delete(final int id) {
		entityManager.remove(getUser(id));
	}

//
//	public User getUserByEmail(final String email) {
//		User user = null;
//		final Query query=entityManager.createQuery("FROM User AS u WHERE u.email = :email");
//		query.setParameter("email", email);
//		try {
//			user =  (User) query.getSingleResult();
//		} catch (EntityNotFoundException | NonUniqueResultException e) {
//			e.printStackTrace();
//		}
//		return user;
//	}
}
