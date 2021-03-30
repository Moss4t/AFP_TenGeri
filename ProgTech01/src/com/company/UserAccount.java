package com.company;

public abstract class UserAccount implements Account{
    @Override
    public void register(String username, String passwd) {

    }

    @Override
    public void login() {

    }

    public abstract void withdraw(int amount);
    public abstract void deposit(int amount);
}
