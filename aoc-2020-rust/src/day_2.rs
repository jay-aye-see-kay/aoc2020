use std::fs;

#[derive(Debug, Clone)]
struct Policy {
    lower: i32,
    upper: i32,
    letter: char,
}

#[derive(Debug, Clone)]
struct Password {
    password: String,
    policy: Policy,
}

fn parse_policy(policy_str: &str) -> Policy {
    let policy_vec: Vec<&str> = policy_str.split(" ").collect();
    let letter = policy_vec.get(1).unwrap().chars().nth(0).unwrap();
    let range = policy_vec.get(0).unwrap();

    let range_vec: Vec<&str> = range.split("-").collect();
    let lower: i32 = range_vec.get(0).unwrap().parse().unwrap();
    let upper: i32 = range_vec.get(1).unwrap().parse().unwrap();

    Policy {
        lower,
        upper,
        letter,
    }
}

fn parse_password(password_str: &str) -> Password {
    let password_vec: Vec<&str> = password_str.split(": ").collect();
    Password {
        password: password_vec.get(1).unwrap().to_string(),
        policy: parse_policy(password_vec.get(0).unwrap()),
    }
}

fn parse_input(filename: &str) -> Vec<Password> {
    let file_content = fs::read_to_string(filename).expect("## Could not find or read file");
    let passwords: Vec<Password> = file_content
        .split("\n")
        .filter(|line| line.len() > 0)
        .map(|line| parse_password(line))
        .collect();
    passwords
}

fn is_password_valid(password: &Password) -> bool {
    let count = password.password.chars().fold(0, |acc, c| {
        if c == password.policy.letter {
            acc + 1
        } else {
            acc
        }
    });
    count >= password.policy.lower && count <= password.policy.upper
}

fn is_password_valid_2(password: &Password) -> bool {
    let lower_match = password
        .password
        .chars()
        .nth((password.policy.lower - 1) as usize)
        .unwrap()
        == password.policy.letter;
    let upper_match = password
        .password
        .chars()
        .nth((password.policy.upper - 1) as usize)
        .unwrap()
        == password.policy.letter;

    if lower_match && upper_match {
        false
    } else {
        lower_match || upper_match
    }
}

fn solve_part_1(passwords: Vec<Password>) -> i32 {
    passwords.iter().fold(0, |sum, password| {
        if is_password_valid(password) {
            sum + 1
        } else {
            sum
        }
    })
}

fn solve_part_2(passwords: Vec<Password>) -> i32 {
    passwords.iter().fold(0, |sum, password| {
        if is_password_valid_2(password) {
            sum + 1
        } else {
            sum
        }
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn day_two() {
        let passwords = parse_input("../input/2.input.txt");
        // println!("passwords: {:?}", passwords);
        assert_eq!(500, solve_part_1(passwords.clone()));
        assert_eq!(313, solve_part_2(passwords));
    }
}
