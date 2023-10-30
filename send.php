
<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $tg_user = '@satedbots'; 
        $bot_token = '6381689532:AAGU990_BJjArTxUji-LwFgUQw8yPYM0o8U'; 

        
        $name = $_POST['name'];
        $phone = $_POST['phone'];

        
        $text = "Ім'я: " . $name . "\nТелефон: " . $phone;


        $params = array(
            'chat_id' => $tg_user, 
            'text' => $text,
            'parse_mode' => 'HTML',
        );

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, 'https://api.telegram.org/bot' . $bot_token . '/sendMessage'); // адреса виклику API функції Telegram
        curl_setopt($curl, CURLOPT_POST, true); // надсилання методом POST
        curl_setopt($curl, CURLOPT_TIMEOUT, 10); // час виконання запиту
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $params); // параметри запиту
        $result = curl_exec($curl); // запит API
        curl_close($curl);

        // Перевірте, чи вдалося відправити повідомлення
        if ($result !== false) {
            echo "Повідомлення відправлено успішно!";
        } else {
            echo "Помилка";
        }
    }
?>
