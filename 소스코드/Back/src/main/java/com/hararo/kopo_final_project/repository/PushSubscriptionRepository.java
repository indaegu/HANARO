package com.hararo.kopo_final_project.repository;

import com.hararo.kopo_final_project.entity.PushSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PushSubscriptionRepository extends JpaRepository<PushSubscription, Long>{

}
