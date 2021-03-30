package com.company;

import java.util.UUID;

public interface Bank {
    public boolean authenticateUser(Account user, String autkey);
    public void addUserAccount(String userName, UUID userID);
}
