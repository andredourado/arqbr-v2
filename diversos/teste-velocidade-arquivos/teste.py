def search_file(file_path, target_string):
    with open(file_path, 'r') as file:
        for line in file:
            if target_string in line:
                print('String found!')
                return True
        print('String not found.')
        return False

result = search_file('./teste.txt', '|9999|118247|')
