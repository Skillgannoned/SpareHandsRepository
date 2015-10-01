package ie.sparehands.daos;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;

import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import ie.sparehands.entities.Advert;

@Stateless
@LocalBean
public class AdvertDAO {

	@PersistenceContext
	private EntityManager entityManager;
	
	public List<Advert> getAllAdverts() {
		final Query query = entityManager.createQuery("SELECT u FROM Advert u");
		return query.getResultList();
	}

	public Advert getAdvert(final int id) {
		return entityManager.find(Advert.class, id);
	}

	public void save(final Advert advert) {
		entityManager.persist(advert);
	}  

	public void update(final Advert advert) {
		entityManager.merge(advert);
	}  

	public void delete(final int id) {
		entityManager.remove(getAdvert(id));
	}

}
