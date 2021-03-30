package com.company;

import java.util.UUID;

public class DigitalBank implements Bank{
    private String iD;
    private String name;
    private String owner;

    @Override
    public boolean authenticateUser(Account user, String autkey) {
        return false;
    }

    @Override
    public void addUserAccount(String userName, UUID userID) {

    }
}
